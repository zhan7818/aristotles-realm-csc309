"use strict";
const log = console.log;
const axios = require('axios')

export const createAStory = async function (userID, storyTitle, storyDate=Date.now(), storyTags, storyViewCount, storyChapters, storyPreview, storyLine){
    return axios('/story/'+userID, {
        method: 'post',
        data:{
            storyTitle,
            storyDate,
            storyTags,
            storyViewCount,
            storyChapters,
            storyPreview,
            storyLine
        }
    })
    .then(res => {
        if (res.status == 200){
            // console.log('Story is created successfuly, return true')
            return true
        }
        return false
    })
    .catch(error => {return false})
}