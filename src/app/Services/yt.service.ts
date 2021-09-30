import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { YoutubeS, YoutubeP, YoutubeV } from "../Youtube.modul";
import { map, catchError } from "rxjs/operators";
import { forkJoin, throwError } from "rxjs";
import { Dialogs } from "@ionic-native/dialogs/ngx";

@Injectable({
  providedIn: "root",
})
export class YTService {
  private apiKey = "AIzaSyBLBWmxsa-P2hlLdLlQfHXMJaPybKpTiz4";

  constructor(private http: HttpClient, private dialog: Dialogs) {}

  getSections(channel: string) {
    return this.http
      .get<YoutubeS>(
        "https://www.googleapis.com/youtube/v3/channelSections?key=" +
          this.apiKey +
          "&channelId=" +
          channel +
          "&part=snippet,contentDetails&maxResults=50"
      )
      .pipe(catchError(this.handleError));
  }

  getSectionsById(id: string) {
    return this.http
      .get<YoutubeS>(
        "https://www.googleapis.com/youtube/v3/channelSections?part=contentDetails%2Csnippet&id=" +
          id +
          "&key=" +
          this.apiKey
      )
      .pipe(catchError(this.handleError));
  }

  getPlaylist(playlistId: string) {
    return this.http
      .get<YoutubeP>(
        " https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2Csnippet%2Cid&id=" +
          playlistId +
          "&maxResults=50&key=" +
          this.apiKey
      )
      .pipe(
        map((res) => {
          return res.items[0];
        }),
        catchError(this.handleError)
      );
  }

  getChannelPlaylist(channelId: string, nextPageToken: string, maxResults) {
    return this.http
      .get<YoutubeP>(
        " https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2Csnippet%2Cid&channelId=" +
          channelId +
          "&maxResults=" +
          maxResults +
          "&pageToken=" +
          nextPageToken +
          "&key=" +
          this.apiKey
      )
      .pipe(catchError(this.handleError));
  }

  //https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=5&playlistId=UUtl99ZlC0VHb6-voQJqhpDg&key=[YOUR_API_KEY] HTTP/1.1

  getPlaylistItems(listId, pageToken) {
    return this.http
      .get<YoutubeV>(
        "https://www.googleapis.com/youtube/v3/playlistItems?key=" +
          this.apiKey +
          "&playlistId=" +
          listId +
          "&part=snippet&maxResults=10&pageToken=" +
          pageToken
      )
      .pipe(catchError(this.handleError));
  }

  getNewPlaylistItems(listId) {
    return this.http
      .get<YoutubeP>(
        "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=" +
          listId +
          "&key=" +
          this.apiKey
      )
      .pipe(catchError(this.handleError));
  }

  getChannels(id) {
    let url: string =
      "https://www.googleapis.com/youtube/v3/channels?part=contentDetails%2Csnippet%2Cstatistics&id=" +
      id +
      "&key=" +
      this.apiKey;
    return this.http.get<any>(url).pipe(
      map((res) => {
        return res.items[0];
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    this.dialog
      .alert("تکایە دڵنیا بەرەوە لە هەبوونی ئینتەرنێت.", "ئینتەرنێت نییە")
      .then(() => {
        navigator["app"].exitApp();
      });
    return throwError(error);
  }
}
