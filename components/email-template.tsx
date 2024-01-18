/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
interface EmailTemplateProps {
  id: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  id,
}) => (
  <div>
    <h1>
      Verify your email by going to this link
      {`https://www.intelligrader.org/verify/${id}`}
    </h1>
  </div>
);
