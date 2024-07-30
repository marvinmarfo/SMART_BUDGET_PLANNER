// module.exports = {  
//     transformer: {  
//      getTransformOptions: async () => ({  
//       transform: {  
//         experimentalImportSupport: false,  
//         inlineRequires: false,  
//       },  
//      }),  
//     },  
//     resolver: {  
//         assetExts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'vg'],  
//        },  
//   };


/* Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);
defaultConfig.transformer.unstable_allowRequireContext = true;
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
        unstable_allowRequireContext: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
