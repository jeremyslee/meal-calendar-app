import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import { capitalize } from '../utils/helper';
import Modal from 'react-modal';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';
import Loading from 'react-loading';
import { fetchRecipes } from '../utils/api';

class App extends Component {
  render() {
    console.log(this.props);
    const { calendar, remove } = this.props;
    const mealOrder = ['breakfast', 'lunch', 'dinner'];

    return (
      <div className='container'>
        <ul className='meal-types'>
          {mealOrder.map(mealType => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => (
              <h3 key={day} className='subheader'>{capitalize(day)}</h3>
            ))}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals}) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({ meal, day })}>Clear</button>
                        </div>
                      : <button className='icon-btn'>
                        <CalendarIcon size={30}/>
                        </button>
                    }
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  }
//   state = {
//     calendar: null
//   }

//   componentDidMount() {
//     const { store } = this.props;

//     store.subscribe(() => {
//       this.setState(() => ({
//         calendar: store.getState()
//       }));
//     });
//   }

//   submitFood = () => {
//     this.props.store.dispatch(addRecipe({
//       day: 'monday',
//       meal: 'breakfast',
//       recipe: {
//         label: this.input.value
//       }
//     }));
//     this.input.value = '';
//   }

//   render() {
//     return (
//       <div>
//         <input
//           type='text'
//           ref={(input) => this.input = input}
//           placeholder="Monday's Breakfast"
//         />
//         <button onClick={this.submitFood}>Submit</button>

//         <pre>
//           Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
//         </pre>
//       </div>
//     );
//   }
}

function mapStateToProps({ calendar, food }) {
  const days = Object.keys(calendar);
  return {
    calendar: days.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
          : null;
        return meals;
      }, {}),
    })),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    add: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
