module Signup exposing (main)

import Browser
import Css exposing (backgroundColor, block, border, borderRadius, cm, color, display, fontSize, hex, margin2, marginTop, padding, padding2, paddingLeft, px)
import Html.Styled exposing (Attribute, Html, div, h1, styled, text, toUnstyled)
import Html.Styled.Attributes exposing (css, id, type_)
import Html.Styled.Events exposing (onClick, onInput)


type alias User =
    { name : String
    , email : String
    , password : String
    , loggedIn : Bool
    }


initialModel : User
initialModel =
    { name = "", email = "", password = "", loggedIn = False }


type Msg
    = SaveName String
    | SaveEmail String
    | SavePassword String
    | Signup


update : Msg -> User -> User
update message user =
    case message of
        SaveName name ->
            { user | name = name }

        SaveEmail email ->
            { user | email = email }

        SavePassword password ->
            { user | password = password }

        Signup ->
            { user | loggedIn = True }


view : User -> Html Msg
view user =
    div []
        [ h1 [ css [ paddingLeft (cm 3) ] ] [ text "Sign up " ]
        , styledForm []
            [ div []
                [ text "Name"
                , styledInput [ id "name", type_ "text", onInput SaveName ] []
                ]
            , div []
                [ text "Email"
                , styledInput [ id "email", type_ "email", onInput SaveEmail ] []
                ]
            , div []
                [ text "Password"
                , styledInput [ id "password", type_ "password", onInput SavePassword ] []
                ]
            , div []
                [ styledButton [ type_ "submit", onClick Signup ]
                    [ text "Create my account" ]
                ]
            ]
        ]


styledForm : List (Attribute msg) -> List (Html msg) -> Html msg
styledForm =
    styled Html.Styled.form
        [ borderRadius (px 5)
        , backgroundColor (hex "#f2f2f2")
        , padding (px 20)
        , Css.width (px 300)
        ]


styledInput : List (Attribute msg) -> List (Html msg) -> Html msg
styledInput =
    styled Html.Styled.input
        [ display block
        , Css.width (px 260)
        , padding2 (px 12) (px 20)
        , margin2 (px 8) (px 0)
        , border (px 0)
        , borderRadius (px 4)
        ]


styledButton : List (Attribute msg) -> List (Html msg) -> Html msg
styledButton =
    styled Html.Styled.button
        [ Css.width (px 300)
        , backgroundColor (hex "#397cd5")
        , color (hex "#fff")
        , padding2 (px 14) (px 20)
        , marginTop (px 10)
        , border (px 0)
        , borderRadius (px 4)
        , fontSize (px 16)
        ]


main : Program () User Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view >> toUnstyled
        , update = update
        }
