import React from "react";
import {FixedSizeList as List} from "react-window";

// Для больших списков react-select
export class MenuList extends React.Component {
    render() {
        const height = 55;
        const {options, children, maxHeight, getValue} = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;

        // const getStyles = this.props.getStyles;
        //
        // console.log('+++', getStyles(1, 'height'));
        // console.log('___', this.props.getStyles('height'));
        // console.log('+_+++', this.props);

        return (
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
                {({index, style}) => <div style={style}>{children[index]}</div>}
            </List>
        );
    }
}
