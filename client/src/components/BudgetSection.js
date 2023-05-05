import React, { Component } from 'react';
import Item from './Item';

class BudgetSection extends Component {

    constructor(props) {
        super(props);

        const { section, budget } = props;
        this.section = section;
        this.budget = budget;

        this.state = {
            spent: 0
        };

        this.calculateSpent = this.calculateSpent.bind(this);
        this.changePercent = this.changePercent.bind(this);
    }

    componentDidMount() {
        this.calculateSpent();
    }

    calculateSpent() {
        let spent = 0;
        this.section.items.forEach(item => {
            spent += item.price;
        });
        this.setState({ spent });
    }

    changePercent(e) {
        const { budget, section } = this.props;
        const newBudget = {...budget};
        newBudget.sections[section.key].percent = e.target.value;
        this.props.modifyBudget(newBudget);
    }

    addItem() {
        console.log('add item');
    }

    calculatePercent(sec, bud) {
        const value = bud.budgetAmount*(sec.percent/100);
        if (isNaN(value)) return "rly? a letter?";
        return value.toFixed(2);
    }

    render() {
        const { section, budget } = this.props;
        const { spent } = this.state;

        return (
            <div className="BudgetSection" key={section.key}>
                <div className='percentCont'>
                    <input type='text' className='percent' value={section.percent} onInput={this.changePercent} />
                    &nbsp;%
                </div>
                
                <div className='sectionTitle' >
                    {section.title}
                </div>

                <div className='fraction' >
                    <span className='spent'>{isNaN(spent) ? 0 : spent.toFixed(2)}</span>
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <span className='total'>{(this.calculatePercent(section, budget))}</span>
                </div>

                {/* Items */}
                <div className='Items'>
                    {section.items.map((item, k) => {
                    return(
                        <Item key={k} budget={budget} item={item} />
                    )
                })}
                </div>

                {/* Add item */}
                <div className='addItem' onClick={this.addItem}>
                    <img src="/images/plus.svg" alt='add item' />
                </div>
                
                
            </div>
        )
    }
}

export default BudgetSection;