
import { Eye } from "./Eye";
import { GitHubIcon } from "./GitHubIcon";
import { GoogleIcon } from "./GoogleIcon";
import { Logo } from "./Logo";


export const Icons = ({ children }) => {
  return <span>{children}</span>;
};

Icons.Logo = Logo;
Icons.GitHubIcon = GitHubIcon;
Icons.GoogleIcon = GoogleIcon;
Icons.Eye = Eye;

