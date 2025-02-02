import AuthModel from "@/models/auth.model";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string | number;
}

export const SendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    const uuid = uuidv4();
    if (emailType === "VERIFY") {
      await AuthModel.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            userId,
            verifyToken: uuid,
            verifyTokenExpiry: Date.now() + 3600000,
          },
        }
      );
    } else if (emailType === "RESET") {
      await AuthModel.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            userId,
            forgotPasswordToken: uuid,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
          },
        }
      );
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "53d47efae47dc1",
        pass: "f2d7c8d7606a38",
      },
    });

    const mailOptions = {
      from: "emart@mail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "Reset your password",
      html: `<p>
      Click <a href="${
        process.env.DOMAIN
      }/auth/verifyemail?token=${uuid}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser.
      <br />
      ${process.env.DOMAIN}/auth/verifyemail?token=${uuid}
      </p>`,
    };

    const mailRepsonse = await transport.sendMail(mailOptions);
    return mailRepsonse;
  } catch (error) {
    console.log(error);
  }
};