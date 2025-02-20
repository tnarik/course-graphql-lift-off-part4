const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },

    // get a single module by ID, for the module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },
  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: (_, { id }, { dataSources }) => 
      // Course version, make the resolver `async`
      //
      // try { 
      //   const track = await dataSources.trackAPI.incrementTrackViews(id);
      //   return {
      //     code: 200,
      //     success: (track != null),
      //     message: `successfully incremented number of views for track ${id}`,
      //     track,
      //   };  
      // } catch (error) {
      //     return {
      //       code: error.extensions.response.status,
      //       success: false,
      //       message: error.extensions.response.body,
      //       track: null,
      //     };
      // }

      // This is the equivalent as then.catch and implicit returns, which I prefer to bre consistent
      dataSources.trackAPI.incrementTrackViews(id).then(track => ({
          code: 200,
          success: true,
          message: `successfully incremented number of views for track ${id}`,
          track: track,
      }))
      .catch(error => ({
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
          track: null,
      }))
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },

    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },
};

module.exports = resolvers;
