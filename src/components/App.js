import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addRecipe, removeFromCalendar } from '../actions';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        Hello World
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

function mapStateToProps(calendar) {
  const days = Object.keys(calendar);
  return {
    calendar: days.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal];
        return meals;
      }, {}),
    })),
  };
}

export default connect(mapStateToProps)(App);
