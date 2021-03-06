import React from "react";
import SideBar from "../SideBar";
import Button from "@material-ui/core/Button";
import { getStory } from "../../actions/story-page";
import StoryPageInfo from "./StoryPageInfo";
import StoryPageChapterTable from "./StoryPageChapterTable";
import StoryPageMain from "./StoryPageMain";
import {voteStory, increaseStoryView} from "../../actions/story"
import ProposalModal from "./newProposal.js"
import "./styles.css";
import { Box } from "@material-ui/core";

// const checkUser = (userId, authorId) => {
//     if (userId == authorId) {
//       return (
        
//       )
//     }
// }

class StoryPage extends React.Component {
  state = {
    userId: window.sessionStorage.getItem('currentUser'),
    story : null,
  }
  componentWillMount() {
    this._asyncRequestStory = getStory(this.props.params.storyId).then(async(res) => {
      this._asyncRequestStory = null;
      console.log('Loading', res.data)
      this.setState({story : res.data})
    })
  }
  componentWillUnmount() {
    if (this._asyncRequestStory) {
      this._asyncRequestStory.cancel();
    }
  }

  async componentDidMount() {
    increaseStoryView(this.props.params.storyId)
  }

  render() {
    if(this.state.story === null){
      return <div>Loading</div>
    }
    
    const chapterNum = this.props.params.chapterNum;
    return (
      <div className="story-page">
          <SideBar appState={this.props.appState} />
          <div className="story-page-wrapper">
          <div className="story-page-body">
            <div className="story-page-content">
              <StoryPageInfo story={this.state.story} />
              <StoryPageChapterTable story={this.state.story} chapterNum={chapterNum} />
              <StoryPageMain story={this.state.story} chapterNum={chapterNum} />
            </div>
            {/* Put buttons in the 'main' div */}
            <div className="story-page-feedback-wrapper">
              <Box mr={1.5} className="story-page-feedback-button">
                {/* {checkUser(this.state.userId, this.state.story.storyAuthorID)} */}
                <ProposalModal style={{float:'right', marginTop:'2%', marginRight:'1%'}} storyTitle={this.state.story.storyTitle} storyChapterNums={this.state.story.storyChapters.length} storyId={this.state.story._id} ></ProposalModal>
              </Box>
              <Box mr={1.5} className="story-page-feedback-button">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => voteStory(this.state.story._id, 1).then(() => {alert('You upvote this story'); window.location.reload()}).catch(error => alert('Fail to upvote this story'))}
                >
                  Upvote
                </Button>
              </Box>
              <Box mr={1.5} className="story-page-feedback-button">
                <Button
                  variant="contained"
                  color="primary" 
                  size="large"
                  onClick={() => voteStory(this.state.story._id, 0).then(() => {alert('You downvote this story'); window.location.reload()}).catch(error => alert('Fail to downvote this story'))}
                >
                  Downvote
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    )  
  }
}

export default StoryPage;
