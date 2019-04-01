import React, { Component } from 'react';

class MemeGenerator extends Component {
    state = {
        topText: '',
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg",
        allMemeImges: []
    }


    handleChange = (e) => {
        console.log("working")
const {name, value} = e.target
this.setState({
    [name] :value
})
     }

    componentDidMount = () => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(res => {
                const { memes } = res.data
                console.log(memes[0])
                this.setState({
                    allMemeImges: memes
                })
            })
    }
    handlesubmit =(e) =>{
     e.preventDefault()
     //get random in(index in the array)
     
     const rundNum = Math.floor(Math.random() * this.state.allMemeImges.length)
     // get the meme from thta index

     const randMemeImg = this.state.allMemeImges[rundNum].url

     // set "randomImg" to the url of the random item i grabbrd
     this.setState({randomImg:randMemeImg })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handlesubmit}>
                    <input
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        placeholder="top text"
                        onChange={this.handleChange} />

                    <input
                        type="text"
                        name="bottomText"
                        value={this.state.bottomText}
                        placeholder="bottom text"
                        onChange={this.handleChange} />
                    <button>Gen</button>

                </form>


                <div className="meme">
                <img src={this.state.randomImg} alt=""/>
                <h2 className="top">{this.state.topText}</h2>
                <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;