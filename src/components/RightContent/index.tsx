import { GITHUB_URL } from '@/constants';
import { QuestionCircleOutlined } from '@ant-design/icons';
import '@umijs/max';

export type SiderTheme = 'light' | 'dark';
export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open(GITHUB_URL);
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
