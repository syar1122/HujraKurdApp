export class YoutubeS {
  public constructor(
    public kind: string,
    public etag: string,
    public id: string,
    public snippet: {
      type: string;
      style: string;
      channelId: string;
      channelTitle: string;
      title: string;
      position: number;
      resourceId: { videoId: string };
      thumbnails: { medium: { url: string } };
      publishedAt: Date;
    },
    public contentDetails: {},
    public src: string
  ) {}
}

export class YoutubeP {
  public constructor(
    public kind: string,
    public etag: string,
    public id: string,
    public nextPageToken: string,
    public items: any,
    public snippet: {},
    public contentDetails: {}
  ) {}
}

export class YoutubeV {
  public constructor(
    public kind: string,
    public etag: string,
    public id: string,
    public nextPageToken: string,
    public items: any[],
    public snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {};
      channelTitle: string;
      playlistId: string;
    },
    public contentDetails: {
      playlists: {};
    },
    public resourceId: {}
  ) {}
}
