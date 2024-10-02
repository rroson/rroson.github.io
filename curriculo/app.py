from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.responses import HTMLResponse
from fastapi.requests import Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
from dotenv import load_dotenv

load_dotenv()  # Carrega as variáveis de ambiente do arquivo .env

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def retorna_html(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.post("/api/contact")
async def contact(form: ContactForm):
    # Configurações do e-mail
    smtp_server = "smtp.gmail.com"
    port = 587
    sender_email = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL")

    # Criação da mensagem
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = f"Currículo: Novo contato de {form.name}"

    body = f"""
    Nome: {form.name}
    E-mail: {form.email}
    Mensagem:
    {form.message}
    """
    message.attach(MIMEText(body, "plain"))

    try:
        # Conexão com o servidor SMTP e envio do e-mail
        with smtplib.SMTP(smtp_server, port) as server:
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        return {"message": "E-mail enviado com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)