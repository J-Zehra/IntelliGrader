/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

/* eslint-disable import/prefer-default-export */

interface EmailTemplateProps {
  id: string;
}

export const PasswordResetEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ id }) => (
  <body
    style={{
      backgroundColor: "#ffffff",
      margin: "0 auto",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    }}
  >
    <table
      align="center"
      width="100%"
      border={0}
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{ maxWidth: "37.5em", margin: "0 auto", padding: "0px 20px" }}
    >
      <tbody>
        <tr style={{ width: "100%" }}>
          <td>
            <table
              align="center"
              width="100%"
              border={0}
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
              style={{ marginTop: "32px" }}
            >
              <tbody>
                <tr>
                  <td>
                    {/* <img
                        alt="IntelliGrader"
                        height="36"
                        src="/logo_v2.svg"
                        style={{
                          display: "block",
                          outline: "none",
                          border: "none",
                          textDecoration: "none",
                        }}
                        width="120"
                      /> */}
                    <h5
                      style={{
                        color: "#035EDD",
                        fontSize: "25px",
                        fontWeight: "bolder",
                      }}
                    >
                      IntelliGrader
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
            <h1
              style={{
                color: "#1d1c1d",
                fontSize: "36px",
                fontWeight: "700",
                margin: "30px 0",
                padding: "0",
                lineHeight: "42px",
              }}
            >
              Reset your Password
            </h1>
            <p
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                margin: "16px 0",
                marginBottom: "30px",
              }}
            >
              Your are one step away from reseting your password - click the
              button below to start the reset process
            </p>
            <table
              align="center"
              width="100%"
              border={0}
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
              style={{
                background: "rgb(245, 244, 245)",
                borderRadius: "4px",
                marginBottom: "30px",
                padding: "40px 10px",
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <a
                      href={`https://intelligrader.org/reset-password/${id}`}
                      target="_black"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        background: "#035EDD",
                        padding: ".8rem 1.2rem",
                        fontSize: "1rem",
                        borderRadius: "1rem",
                        margin: "16px 0",
                        verticalAlign: "middle",
                      }}
                    >
                      Reset Password
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                margin: "16px 0",
                color: "#000",
              }}
            >
              If you didn&apos;t request this email, there&apos;s nothing to
              worry about; you can safely ignore it.
            </p>

            <table
              align="center"
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "12px",
                        lineHeight: "15px",
                        margin: "16px 0",
                        color: "#b7b7b7",
                        textAlign: "left",
                        marginBottom: "50px",
                      }}
                    >
                      ©2024 ScoreTech.
                      <br />
                      Quezon Province, Philippines
                      <br />
                      <br />
                      All rights reserved.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
);
