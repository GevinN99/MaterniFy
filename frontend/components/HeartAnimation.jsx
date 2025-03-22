// import React, { useState, useEffect, useRef } from "react";
// import { View, Animated, Easing } from "react-native";
// import Svg, { Path, ClipPath,Rect } from "react-native-svg";

// const AnimatedHeader = ({ score }) => {
//     const animatedHeight = useRef(new Animated.Value(100)).current; // Start with full height

//     useEffect(() => {
//         const targetHeight = (1 - score / 30) * 100; // Calculate target height
//         Animated.timing(animatedHeight, {
//             toValue: targetHeight,
//             duration: 1000,
//             easing: Easing.ease,
//             useNativeDriver: false,
//         }).start();
//     }, [score]);

//     const getHeartPath = (fillPercentage) => {
//         if (score === 30) {
//             return "M10 30 C 10 20, 30 10, 50 30 C 70 10, 90 20, 90 30 M10 30 C 10 40, 30 50, 50 90 C 70 50, 90 40, 90 30";
//         } else if (fillPercentage < 1) {
//             const fillHeight = 60 * (1 - fillPercentage);
//             const controlPointY = 30 + (60 - fillHeight) / 2;
//             return `M10 30 A20 20 0 0 1 50 30 A20 20 0 0 1 90 30 Q90 ${controlPointY} 50 ${controlPointY + fillHeight} Q10 ${controlPointY} 10 30 Z`;
//         } else {
//             return "M10 30 A20 20 0 0 1 50 30 A20 20 0 0 1 90 30 Q90 60 50 90 Q10 60 10 30 Z";
//         }
//     };

//     return (
//         <View style={{ alignItems: "center", marginBottom: 10 }}>
//             <Svg width={100} height={100}>
//                 <ClipPath id="clip">
//                     <Animated.Rect width={100} height={animatedHeight} y={Animated.subtract(100, animatedHeight)} />
//                 </ClipPath>
//                 <Animated.Path d={getHeartPath(1 - score / 30)} fill="#FDD1D4" clipPath="url(#clip)" />
//                 {score === 30 && (
//                     <Path
//                         d="M10 30 C 10 20, 30 10, 50 30 C 70 10, 90 20, 90 30 M10 30 C 10 40, 30 50, 50 90 C 70 50, 90 40, 90 30"
//                         fill="#FDD1D4"
//                     />
//                 )}
//                 <Path
//                     d="M10 30 A20 20 0 0 1 50 30 A20 20 0 0 1 90 30 Q90 60 50 90 Q10 60 10 30 Z"
//                     fill="none"
//                     stroke="#A3C8E8"
//                     strokeWidth={2}
//                 />
//             </Svg>
//         </View>
//     );
// };

// export default AnimatedHeader;

import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { styled } from "nativewind";
import Svg, { Path, ClipPath, Rect, Defs } from "react-native-svg";

const StyledView = styled(View);
const StyledText = styled(Text);

const HeartAnimation = ({ score }) => {
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const fillPercentage = score / 30; // Assuming the max score is 30

  useEffect(() => {
    Animated.timing(fillAnimation, {
      toValue: fillPercentage,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [fillPercentage]);

  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledText className="text-xl font-bold mb-4">Your EPDS Score</StyledText>
      <View className="relative w-32 h-32">
        <Svg width={128} height={128} viewBox="0 0 24 24" fill="none">
          <Defs>
            <ClipPath id="heartClip">
              <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </ClipPath>
          </Defs>
          <Path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#ccc"
          />
          <Animated.Rect
            x="0"
            y={128 - fillAnimation.interpolate({ inputRange: [0, 1], outputRange: [128, 0] })}
            width="24"
            height={fillAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 128] })}
            fill="red"
            clipPath="url(#heartClip)"
          />
        </Svg>
      </View>
    </StyledView>
  );
};

export default HeartAnimation;