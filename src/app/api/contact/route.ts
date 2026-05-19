import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { _subject, _captcha, ...fields } = data;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const fieldsHtml = Object.entries(fields)
            .map(([key, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;color:#333">${key}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555">${value}</td></tr>`)
            .join('');

        await transporter.sendMail({
            from: `"Voltaje Web" <${process.env.EMAIL_USER}>`,
            to: 'voltajevzla@gmail.com',
            bcc: 'ventasvoltaje09@gmail.com',
            subject: _subject || 'Nuevo mensaje desde Voltaje Web',
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
                    <div style="background:#00E676;padding:20px;border-radius:10px 10px 0 0;text-align:center">
                        <h1 style="color:#000;margin:0;font-size:20px">Voltaje Plus</h1>
                    </div>
                    <div style="background:#fff;border:1px solid #eee;border-top:0;padding:20px;border-radius:0 0 10px 10px">
                        <h2 style="color:#333;margin-top:0">${_subject || 'Nuevo mensaje'}</h2>
                        <table style="width:100%;border-collapse:collapse;margin-top:16px">
                            ${fieldsHtml}
                        </table>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true, message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar correo:', error);
        return NextResponse.json({ success: false, message: 'Error al enviar el correo' }, { status: 500 });
    }
}
