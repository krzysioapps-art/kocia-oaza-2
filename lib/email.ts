import nodemailer from "nodemailer";

const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_APP_PASSWORD;

if (!gmailUser || !gmailPassword) {
    throw new Error(
        "Brak GMAIL_USER lub GMAIL_APP_PASSWORD w .env.local"
    );
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailUser,
        pass: gmailPassword,
    },
});

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    return transporter.sendMail({
        from: `"Kocia Oaza" <${gmailUser}>`,
        to,
        subject,
        html,
    });
}