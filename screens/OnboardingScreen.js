import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/logo2.png'),
    title: 'Welcome to REV',
    description: 'Your one-stop solution for motorcycle maintenance ',
  },
  {
    id: '2',
    image: require('../assets/revai.png'),
    title: 'Rev AI Assistant',
    description: 'Chat with our AI-powered assistant for instant help',
  },
  {
    id: '3',
    image: require('../assets/revmech.png'),
    title: 'Expert Mechanics',
    description: 'Connect with skilled mechanics in your area',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('RoleSelect');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const Paginator = () => {
    return (
      <View style={styles.paginator}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
              key={index}
            />
          );
        })}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#1C2433', '#1C2433']} style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={slides}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      
      <Paginator />
      
      <TouchableOpacity style={styles.nextButton} onPress={scrollTo}>
        <Text style={styles.nextButtonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex: 3,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 30,
    tintColor: '#ff4b2b',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    paddingHorizontal: 25,
  },
  paginator: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4b2b',
    marginHorizontal: 4,
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#ff4b2b',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OnboardingScreen;