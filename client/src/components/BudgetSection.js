import React, { Component } from 'react';
import Item from './Item';
import ColorSelector from './ColorSelector';

class BudgetSection extends Component {

    constructor(props) {
        super(props);

        const { section, budget } = props;
        this.section = section;
        this.budget = budget;

        this.calculateSpent = this.calculateSpent.bind(this);
        this.changePercent = this.changePercent.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    calculateSpent(section) {
        let spent = 0;
        section.items.forEach(item => {
            spent += item.price ? parseFloat(item.price) : 0;
        });
        return spent;
    }

    changePercent(e) {
        const { budget, section } = this.props;
        const newBudget = {...budget};
        let otherPercentUsed = 0;
        budget.sections.forEach(sec => {
            if (sec.id === section.id) return;
            otherPercentUsed+=sec.percent;
        });
        const newValue = parseFloat(e.target.value);
        if (otherPercentUsed + newValue >= 100) {
            newBudget.sections[section.key].percent = 100 - otherPercentUsed;
        } else {
            newBudget.sections[section.key].percent = newValue;
        }
        this.props.modifyBudget(newBudget);
    }

    changeName(e) {
        const { budget, section } = this.props;
        const newBudget = {...budget};
        newBudget.sections[section.key].title = e.target.value;
        this.props.modifyBudget(newBudget);
    }

    addItem(section) {
        this.props.addItem(section);
    }

    calculatePercent(sec, bud) {
        const value = bud.budgetAmount*(sec.percent/100);
        return value.toFixed(2);
    }


    changeItem(item, sectionKey) {
        this.props.changeItem(item, sectionKey);
    }

    deleteItem(section, item) {
        this.props.deleteItem(section, item);
    }
    changeColor(section, color) {
        this.props.changeColor(section, color);
    }

    render() {
        const { section, budget } = this.props;
        const spent = this.calculateSpent(section, budget);

        //const spentText = isNaN(spent) ? 0 : typeof(spent) !== 'string' ? spent.toFixed(2) : spent.substring(spent.length - 1) === "." ? spent : spent.substring(spent.length - 2) === ".0" ? spent : spent.toFixed(2);
        const totalText = this.calculatePercent(section, budget);

        const amountLeft = totalText - spent;

        return (
            <div className="BudgetSection" key={section.key}>
                {/* <div className='percentCont'>
                    <input type='text' className='percent' value={section.percent} onInput={this.changePercent} />
                    &nbsp;%
                </div> */}

                <ColorSelector section={section} changeColor={this.changeColor} user={this.props.user}/>

                <div className='removeCategory' onClick={() => this.props.requestRemoveCategory(section)} title='Delete category'>
                    <img src='/images/minus.svg' alt='remove category' />
                </div>
                
                <div className='sectionTitle' >
                    <input id={`sectionTitle${section.id}`} type="text" value={section.title} onInput={this.changeName} placeholder='Unnamed' />
    
                </div>

                <div className='percentSlider'>
                    <input type='range' className='slider' value={section.percent} onInput={this.changePercent} min={0} max={100} step={1} style={{background: section.color}} />
                </div>

                <div className='percentToAmount'>
                    {section.percent.toFixed(0)}% &nbsp; = &nbsp; ${totalText}
                </div>

                {/* Items */}
                <div className='Items'>
                    {section.items.map((item, k) => {
                    return(
                        <Item ref={item.ref} key={item.id} budget={budget} section={section} item={item} changeItem={this.changeItem} deleteItem={this.deleteItem} />
                    )
                })}
                </div>

                {/* Amount Left / Add item */}
                <div className='belowSection'>
                    <div className={`amountLeft ${section.items.length === 0 ? '' : 'active'} ${amountLeft<0 ? 'red' : ''}`}>
                        ${(Math.abs(amountLeft)).toFixed(2)} {amountLeft<0 ? 'OVER' : 'LEFT'}
                    </div>

                    <div className='addItem' onClick={() => {this.addItem(section)}} style={{borderColor: section.color}} >
                        <img src="/images/plus.svg" alt='add item' /> Purchase/debit
                    </div>
                </div>
                

                <div className='rightBorder'></div>
                
                
            </div>
        )
    }
}

export default BudgetSection;