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
    <text>Click Verify to start using your account. </text>
    <a href={`https://intelligrader.org/verify/${id}`} target="_black">
      Verify
    </a>
  </div>
);
