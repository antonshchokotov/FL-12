import { connect } from 'react-redux';
import Search from './Search';
import { searchChange } from '../redux/actions';

const mapStateToProps = state => ({
  searchText: state.searchText
});

const mapDispatchToProps = dispatch => ({
  searchChange: text => dispatch(searchChange(text))
});


export default connect(mapStateToProps, mapDispatchToProps)(Search);