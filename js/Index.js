import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider, connect} from 'react-redux'
import {store} from './reducers'


import {ToastContainer} from 'react-toastify';
import {Auth} from './components/authorization/Auth'
import {Main} from './pages/Main'
import {Card} from './pages/Card'
import {CardsArchive} from './pages/CardsArchive'
import {Analytics} from './pages/Analytics'
import {Contacts} from './pages/Contacts'
import {Documents} from './pages/Documents'
import {Settings} from './pages/Settings'
import {Support} from './pages/Support'
import {Tasks} from './pages/Tasks'
import {Error} from './pages/Error'
import {Admin} from "./pages/Admin";
import {AdminChangeInfo} from "./pages/AdminChangeInfo";
import {Training_structure} from "./pages/Training_structure";
import {Training_content} from "./pages/Training_content";
import {Cards} from "./pages/Cards";
import {Contact} from "./pages/Contact";
import {External_sources} from "./pages/External_sources";
import {Share_cards} from "./pages/Share_cards";
import {Checkin} from "./components/authorization/Checkin";

// import ToastContainer from "../library/react-toastify-master/src/components/ToastContainer";


class Index extends React.Component {

  state = {
    user_profile: false,
    fullUser: {},
  };

  changeStateIndex = state => {
    this.setState(state)
  };

  loadData = forceLoad => {
    const authorized = this.props.login;
    const {user_profile} = this.state;
    const {changeStateIndex} = this;

    if ((authorized && !user_profile) || forceLoad) {
      get_user_profile(true, 1, false).done(function (user_profile) {
        changeStateIndex({user_profile})
      })

      get_user_access_control().done((response) => {
        window.localStorage.setItem('access', JSON.stringify(response))
      })

    }
  };

  componentDidMount() {
    window.Index = this;
    this.loadData()
  }

  componentDidUpdate() {
    this.loadData()
  }

  render() {
    console.log('render Index');

    const authorized = this.props.login;
    const {user_profile} = this.state;

    // return <div className="flex-center wh-100"><img src="/images/technical_works.jpg" className="wmax-100" alt=""/></div>;

    // Если авторизован, но не загрузились данные о пользователе
    if (authorized && !user_profile) return <div className="google-loader"><span/><span/><span/><span/></div>;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={authorized ? Main : Auth}/>

          {/*<Route exact path="/"*/}
          {/*       render={*/}
          {/*           props => authorized ?*/}
          {/*               <Main {...props} user_profile={user_profile}/> :*/}
          {/*               <Auth {...props}/>*/}
          {/*       }*/}
          {/*/>*/}

          <Route path="/8e4c494bb5f3cf91444c82103579b1ba" component={Checkin}/>

          <Route exact path="/cards"
                 render={
                   props => authorized ?
                     <Cards {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />
          <Route exact path="/cards-archive"
                 render={
                   props => authorized ?
                     <CardsArchive {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />
          <Route path="/cards/:id"
                 render={
                   props => authorized ?
                     <Card {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />
          <Route path="/analytics"
                 render={
                   props => authorized ?
                     <Analytics {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />
          <Route exact path="/contacts"
                 render={
                   props => authorized ?
                     <Contacts {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />
          <Route path="/contacts/:id"
                 render={
                   props => authorized ?
                     <Contact {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />
          <Route path="/documents" component={authorized ? Documents : Auth}/>
          <Route path="/settings"
                 render={
                   props => authorized ?
                     <Settings {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />
          <Route path="/support" component={authorized ? Support : Auth}/>
          <Route path="/tasks" component={authorized ? Tasks : Auth}/>
          <Route exact path="/training" component={Training_structure}/>
          <Route path="/training/:type" component={Training_content}/>
          <Route exact path="/admin"
            // component={authorized ? Admin : Auth}
                 render={
                   props => authorized ?
                     <Admin {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />
          <Route exact path="/admin/:id"
                 render={
                   props => authorized ?
                     <AdminChangeInfo {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />

          <Route path="/external_sources"
                 render={
                   props => authorized ?
                     <External_sources {...props} user_profile={user_profile}/> :
                     <Auth {...props}/>
                 }
          />

          <Route path="/share_cards/:hash" component={Share_cards}/>

          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    )

  }
}

Index = connect(store => store.reducerLogin)(Index);


// function mapStateToProps1(store) {
//     console.log('connect', typeof store.reducerCheckIn);
//     return store.reducerCheckIn;
// }

// Подписываем компонент на прослушивание изменений в состоянии и передаем эти изменения в свойства компонента


ReactDOM.render(
  <Provider store={store}>
    <Index/>
  </Provider>,
  document.getElementById('root')
);

ReactDOM.render(
  <ToastContainer autoClose={3000} hideProgressBar={true} position="bottom-right"/>,
  document.getElementById('ToastContainer')
);
