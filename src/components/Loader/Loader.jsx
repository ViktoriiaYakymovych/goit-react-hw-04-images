import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Oval
      height={60}
      width={60}
      color="blue"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="blue"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
