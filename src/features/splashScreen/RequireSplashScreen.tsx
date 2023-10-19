import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from './SplashScreen';

interface RequireSplashScreen {
  children: React.ReactNode;
}

const RequireSplashScreen: React.FC<RequireSplashScreen> = ({children}) => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] =
    React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3600);
    return () => clearTimeout(timer);
  }, []);

  return <>{isSplashScreenVisible ? <SplashScreen /> : children}</>;
};

export default RequireSplashScreen;
