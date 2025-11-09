import { string } from 'prop-types';
import Logo from '/icon.svg';

function LogoIcon({ className }) {
  return (
    <div
      className={`${className} mx-auto size-12 rounded-full bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 flex justify-center items-center`}
      id="logo-icon"
    >
      <img
        src={Logo}
        className="w-6 aspect-square hover:w-8 transition-all"
        alt="Logo"
      />
    </div>
  );
}

LogoIcon.propTypes = {
  className: string,
};

export default LogoIcon;
