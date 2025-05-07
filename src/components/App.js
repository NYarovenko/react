import { Component } from "react"
import { QuizList } from "./QuizList/QuizList";
import initionalQuizItems from "./data.json";
import { SearchBar } from "./SearchBar/SearchBar";
import { QuizForm } from "./QuizForm/QuizForm";


export class App extends Component {
  state = {
    quizItems: initionalQuizItems,
    filters: {
      topic:'',
      level: 'all',
    },
  };

  deleteQuizItem = (quizID) =>{
    this.setState (prevState => ({
      quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizID)
    }))
  }

  changeFilter = (key, value) =>{
    this.setState(prevState => ({
      filters:{
        ...prevState.filters,
        [key]: value,
      }
    }))
  }

  getVisibleItems = () =>{
    const {quizItems, filters} = this.state;
    return quizItems.filter(quiz => {
      const topicFilter = filters.topic.toLowerCase();
      const hasTopic = quiz.topic.toLowerCase().includes(topicFilter);

        if (filters.level === 'all')
        return hasTopic;       
 
        return  hasTopic && quiz.level === filters.level} )
  }

  render(){
    const {filters} = this.state;
    const visibleItems = this.getVisibleItems();

    return (
      <div>
        <QuizForm/>
        <SearchBar filters={filters}
        onChangeFilter={this.changeFilter}
        />
        <QuizList items={visibleItems}
        onDelete={this.deleteQuizItem}/>
        
      </div>
    );
  }
  
};
