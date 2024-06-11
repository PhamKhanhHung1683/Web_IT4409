import { drawerAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => {
    const { colorScheme: c } = props;
    return {
        overlay: {
            bg: 'transparent',
        },
        dialogContainer: {
            bg: 'transparent',
        },
    };
});

export const drawerTheme = defineMultiStyleConfig({
    baseStyle,
});
