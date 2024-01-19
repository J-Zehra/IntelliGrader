/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

/* eslint-disable import/prefer-default-export */

interface EmailTemplateProps {
  id: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  id,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
    }}
  >
    <div
      style={{
        paddingBlock: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontWeight: "bold", fontSize: "2.5rem", color: "#035EDD" }}>
        IntelliGrader
      </h1>
    </div>
    <p>Thank you for using IntelliGrader</p>
    <p>
      You are just one step away from using your account. Click the button below
      to verify your email
    </p>
    <a
      href={`https://intelligrader.org/verify/${id}`}
      target="_black"
      style={{
        textDecoration: "none",
        color: "white",
        background: "#035EDD",
        padding: ".8rem 1.2rem",
        fontSize: "1rem",
        borderRadius: "1rem",
      }}
    >
      Verify
    </a>
  </div>
);
