import React, { Component } from 'react';

class ColorSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
        }

        this.colors = ['#48639C', '#489C74', '#9C4894', '#9C4848', '#9C8A48'];
        this.changeColor = this.changeColor.bind(this);
        this.activate = this.activate.bind(this);
    }


    changeColor(color) {
        // Choose color
        this.setState({
            active: false,
        });

        // Callback
        this.props.changeColor(this.props.section, color);
    }

    activate() {
        this.setState({
            active: true,
        });
    }

    render() {
        const currentColor = this.props.section.color;
        const { active } = this.state;
        const colors = this.colors;

        return (
            <div className='ColorSelector'>
                <div id='currentColor' className={active ? '' : 'active'}>
                    <div onClick={this.activate} className='outter'style={{backgroundColor: currentColor}}>  <div className='middle'> <div className='inner' style={{backgroundColor: currentColor}}></div> </div>  </div>
                </div>

                <div id='otherColors' className={active ? 'active' : ''}>
                    {colors.map(color => <div onClick={() => {this.changeColor(color)}} className='outter'style={{backgroundColor: color}}>  <div className='middle'> <div className='inner' style={{backgroundColor: color}}></div> </div>  </div>)}
                </div>
                
            </div>
        )
    }
}

export default ColorSelector;