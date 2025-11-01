import { Dimensions, PixelRatio } from 'react-native'

// Window dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

// Base guideline (artboard) size – change if your design uses a different base
const BASE_WIDTH = 375
const BASE_HEIGHT = 667

/**
 * Horizontal scale based on BASE_WIDTH
 * @param {number} size - size from design (px)
 * @returns {number} scaled size for current device
 */
const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size

/**
 * Vertical scale based on BASE_HEIGHT
 */
const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size

/**
 * Moderate scale mixes fixed size and scaled size.
 * Use for fonts or elements that shouldn't grow/shrink too aggressively.
 * factor: 0 => returns original size, 1 => fully scaled
 */
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor

/**
 * Round to nearest pixel - helps keep text sharp across densities
 */
const normalize = (size) => {
  const newSize = scale(size)
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export { SCREEN_WIDTH, SCREEN_HEIGHT, scale, verticalScale, moderateScale, normalize }
