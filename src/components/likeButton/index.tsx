import { useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { LikeLottie } from '@assets/index';

interface Props {
  liked?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}
export function LikeButton({ liked, onPress, style }: Props) {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play(0, liked ? 50 : 10);
  }, []);

  const like = () => {
    animation.current?.play(10, 50);
  };

  const unlike = () => {
    animation.current?.play(50, 10);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (liked) {
          unlike();
        } else {
          like();
        }
        onPress?.();
      }}
      style={[styles.animationContainer, style]}
    >
      <LottieView
        ref={animation}
        style={styles.animation}
        source={LikeLottie}
        autoPlay={false}
        loop={false}
        speed={1.5}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 50,
    height: 50,
  },
});
