import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
class AddMovie extends React.Component {
    constructor(props) {
        // to initialize variable and methods
        // this - parent class React.Component and object class
        super(props);//because using parent class variable
        this.state = {
            id: '',
            mname: '',
            mtype: '',
            mdesc: '',
            movielist: [],
            isUpdate: false,// to check whether to update or insert
            isDelete: false,
            isValidate: false,//to check whether form is valid or not
            message: ''
        }
        this.getMovieName = this.getMovieName.bind(this);// for creating our own method we need to add this
        this.getMovieType = this.getMovieType.bind(this);
        this.getMovieDesc = this.getMovieDesc.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.deleteConfirm=this.deleteConfirm.bind(this);
        this.resetId=this.resetId.bind(this);
        this.getAll = this.getAll.bind(this);
        console.log('constructor');
    }
    getMovieName(e) {
        this.setState({ mname: e.target.value });
    }
    getMovieType(e) {
        this.setState({ mtype: e.target.value });
    }
    getMovieDesc(e) {
        this.setState({ mdesc: e.target.value });
    }
    editMovie(id) {
        // to edit movie
        fetch('http://localhost:8000/movie/get/' + id)
            .then((response) => {
                return response.json();
            }).then((result) => {
                this.setState({
                    id: result[0]._id,
                    mname: result[0].name,
                    mtype: result[0].type,
                    mdesc: result[0].desc,
                    isUpdate: true
                });
            }).catch((err) => {
                console.log(err);
            });
    }
    resetForm() {
        this.setState({
            mname: '', mtype: '', mdesc: '', isUpdate: false
        });
    }
    deleteConfirm(id){
        this.setState({
            id:id,
        });
    }
    deleteMovie(id) {
        fetch('http://localhost:8000/movie/delete/' +id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json();
        }).then((result) => {
            if (result.message === 'Deleted') {
                // this.setState({isDelete:false});
                this.resetId();
                this.getAll();//to refresh the movie list
            } else {
                alert('Error occured while deleting movie');
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    resetId(){
        this.setState({
            id:''
        })
    }
    getAll() {
        fetch('http://localhost:8000/movie/getAll')
            .then((response) => {
                return response.json();
            }).then((result) => {
                this.setState({ movielist: result });
            }).catch((err) => {
                console.log(err);
            });
    }
    updateMovie() {
        var movie = {
            "_id": this.state.id,
            "name": this.state.mname,
            "type": this.state.mtype,
            "desc": this.state.mdesc
        }
        // connect API call to update movie using fetch API
        fetch('http://localhost:8000/movie/update/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then((response) => {
            return response.json();
        }).then((result) => {
            if (result.message === 'Updated') {
                this.resetForm(); //to reset the form
                // this.setState({isUpdate:false});
                this.getAll();//to refresh the movie list
            } else {
                alert('Error occured while updating movie');
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    saveMovie() {
        // To validate form
        if (this.state.mname === '' || this.state.mtype === '' || this.state.mdesc === '') {
            this.setState({
                isValidate: false,
                message: 'Please fill all the fields'
            });
            return;
        }
        var movie = {
            "name": this.state.mname,
            "type": this.state.mtype,
            "desc": this.state.mdesc
        }
        // this.setState({movielist:this.state.movielist.concat(movie)})
        // console.log(this.state.movielist);
        // connect API call to save movie using fetch API
        fetch('http://localhost:8000/movie/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then((response) => {
            return response.json();
        }).then((result) => {
            if (result.message === 'Inserted') {
                this.setState({
                    isValidate: true,
                    message: 'Movie saved successfully'
                });
                this.resetForm(); //to reset the form
                this.getAll();//to refresh the movie list
            } else {
                alert('Error occured while saving movie');
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        // console.log('render');
        return (
            <div>
                <hr></hr>
                <h2>Add Movie - {this.props.title}</h2>
                <hr></hr>
                <form>
                    Movie Name:<input type="text" value={this.state.mname} onChange={this.getMovieName} /><br></br>
                    Movie Type:<input type="text" value={this.state.mtype} onChange={this.getMovieType}></input><br></br>
                    Movie Desc:<input type="text" value={this.state.mdesc} onChange={this.getMovieDesc}></input><br></br>
                    {(this.state.isUpdate) ?
                        <input type="button" value="Update" onClick={this.updateMovie} className="btn btn-primary"></input>
                        :
                        <input type="button" value="save" onClick={this.saveMovie} className="btn btn-primary"></input>
                    }
                    {(this.state.isDelete) ?
                        <input type="button" value="Delete" onClick={this.deleteMovie} className="btn btn-primary"></input>
                        :
                        '' // <input type="button" value="save" onClick={this.saveMovie} className="btn btn-primary"></input>
                    }
                    <input type="button" value="Reset" onClick={this.resetForm} className="btn btn-secondary"></input>
                </form>
                {(this.state.message !== '') ?
                    <div>
                        {(this.state.isValidate) ?
                            <div className="alert alert-success">{this.state.message}</div>
                            :
                            <div className="alert alert-danger">{this.state.message}</div>
                        }
                    </div>
                    : ''}
                <table className="table table-border table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Desc</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movielist.map((item) => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.desc}</td>
                                <td><button className="btn btn-primary" onClick={() => this.editMovie(item._id)}>Edit</button></td>
                                {/* <td><button className="btn btn-danger" onClick={() => this.deleteMovie(item._id)}>Delete</button></td> */}
                                <td><button className="btn btn-danger" data-target="#confirmModel" data-toggle="modal" onClick={()=>{this.deleteConfirm(item._id)}}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* always use curly brackets for variable*/}
                {/* {this.state.mname}
                {this.state.mdesc}
                {this.state.mtype} */}
                {/* <!-- Modal --> */}
                <div class="modal fade" id="confirmModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                Are you sure you want to delete this movie?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>this.resetForm()}>No</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>{this.deleteMovie(this.state.id)}}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {  //only render ones
        this.getAll(); //default data
        // console.log('componentDidMount')
        // setTimeout(()=>{
        //     this.setState({mname:'Movie ABC'})
        // },5000)
        // To load default data after render
    }
}
export default AddMovie;

