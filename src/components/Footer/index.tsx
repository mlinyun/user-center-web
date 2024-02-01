import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {GITHUB_URL} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = '凌云 (mlinyun) 出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'mlinyun user center back',
          title: '凌云用户中心后端',
          href: GITHUB_URL + '/user-center',
          blankTarget: true,
        },
        {
          key: 'github of mlinyun',
          title: <><GithubOutlined /> 凌云 (mlinyun)</>,
          href: GITHUB_URL,
          blankTarget: true,
        },
        {
          key: 'mlinyun user center front',
          title: '凌云用户中心前端',
          href: GITHUB_URL + '/user-center-web',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
