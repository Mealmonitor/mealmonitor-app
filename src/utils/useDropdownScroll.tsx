import React from 'react';
import {Platform} from 'react-native';

const marginTop = Platform.OS === 'ios' ? 0 : 30;

const useDropdownScroll = (ref: any, scrollViewRef: any) => {
  const [scrollY, setScrollY] = React.useState(0);

  const handleDropdownFocus = () => {
    if (ref && scrollViewRef) {
      ref.current.measureLayout(
        scrollViewRef.current,
        (x: number, y: number) => {
          scrollViewRef.current.scrollTo({
            y: y,
            animated: false,
          });
          setScrollY(y);
        },
      );
    }
  };

  React.useEffect(() => {
    if (ref) {
      ref.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          if (y !== scrollY) {
            const newPosition = y + height + marginTop;
            setScrollY(newPosition);
          }
        },
      );
    }
  }, [ref, scrollY]);

  return {handleDropdownFocus, scrollY};
};

export default useDropdownScroll;
