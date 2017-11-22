//https://github.com/react-dnd/react-dnd/tree/master/examples/01%20Dustbin/Single%20Target
import React, { Component } from 'react'
import { Icon } from 'bilo-ui'
import { cardStyle } from './styles'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './item-types'
import { log } from '../../../utils/log'

const cardSource = {
    beginDrag(props, monitor, component) {
        return {
            name: props.name
        }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if(dropResult) {
            log(`<Card:>`,`You dropped "${item.name}" into "${dropResult.name}"`,{dropResult})
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

@DragSource(ItemTypes.CARD, cardSource, collect)
export default class Card extends Component {
    render() {
        const { name, type, connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div style={cardStyle}>
                <Icon name={type === 'number' ? 'icon' : 'search'} /> {name}
            </div>
        )
    }
}