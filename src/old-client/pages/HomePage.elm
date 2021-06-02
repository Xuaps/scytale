module HomePage exposing (main)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Browser
import File exposing (File)
import Html exposing (..)
import Html.Attributes exposing (id, type_, href)
import Html.Events exposing (on, onClick)
import Http
import Json.Decode as Decode exposing (..)


type Msg
    = UploadFile
    | FileSelected (File)
    | FileUploaded (Result Http.Error String)


type alias Doc =
    { file : Maybe File, uuid : String, error : String }


url : String
url =
    "http://localhost:3000/api/documents"

--//cmd

uploadFile : File -> Cmd Msg
uploadFile file =
    Http.post
        { url = url
        , body = Http.multipartBody [ Http.filePart "document" file ]
        , expect = Http.expectJson FileUploaded fileIdDecoder
        }


---/// json
fileIdDecoder : Decoder String
fileIdDecoder =
    at [ "id" ] string


--/////
init : () -> ( Doc, Cmd Msg )
init _ =
    ( { file = Nothing, uuid = "", error = "" }, Cmd.none )


update : Msg -> Doc -> ( Doc, Cmd Msg )
update msg model =
    case msg of
        UploadFile ->
            case model.file of
                Just file ->
                    ( model, uploadFile file )

                Nothing ->
                    ( model, Cmd.none )

        FileSelected selectedFile ->
            ( { model | file = Just(selectedFile) }, Cmd.none )

        FileUploaded (Ok result) ->
            ( { model | uuid = result }, Cmd.none )

        FileUploaded (Err result) ->
            ( { model | error = Debug.toString result }, Cmd.none )


view : Doc -> Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet -- creates an inline style node with the Bootstrap CSS
        , Grid.row []
            [ Grid.col []
                [ node "custom-file"
                      [ on "file-selected"
                          (Decode.field "detail" (Decode.map FileSelected File.decoder))
                      ]
                      []
                  , p [] [ text <| "File: " ++ Debug.toString model ]
                ]
            ]
        , Grid.row []
            [ Grid.col []
                [ a[href (String.join "/" [url, model.uuid ])][
                    text model.uuid
                ] ]
            ]
        , Grid.row []
            [ Grid.col []
                [ text model.error ]
            ]
        ]


main : Program () Doc Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
