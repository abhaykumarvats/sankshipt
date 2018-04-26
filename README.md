# Table of Contents
* [Introduction](#introduction)
    * [Features](#features)
* [Documentation](#documentation)
* [Fun Fact](#fun-fact)
* [Thanks](#thanks)

# Introduction
Sankshipt is a RESTful web API that provides functionality to shorten URLs, and visit the shortened ones.

## Features
* [Shorten URL](#shorten-url)
* [Visit Shortened URL](#visit-shortened-url)

# Documentation
__Base URL:__ `https://sankshipt.herokuapp.com`

## Shorten URL
Provided URL is shortened to a unique number ID.

* __URL__

    `/new`

* __Method__

    `GET`

* __URL Params__

    __Required:__

    `/<original-url>`

* __Success Response__

    * __Code:__ 200 OK

    * __Content:__

        ```json
        {
            "_id":1,
            "original_url":"https://github.com/abhaykv04",
            "short_url":"https://sankshipt.herokuapp.com/1"
        }
        ```

* __Error Response__

    * __Code:__ 400 BAD REQUEST

    * __Content:__

        ```
        400: Bad Request: Invalid URL
        ```

* __Sample Call__

    ```
    curl --request GET \
      --url 'https://sankshipt.herokuapp.com/new/https://github.com/abhaykv04'
    ```

## Visit Shortened URL
Visit an already shortened URL with its unique number ID.

* __URL__

    `/`

* __Method__

    `GET`

* __URL Params__

    __Required:__

    `<unique-id>`

* __Success Response__

    * __Code:__ 200 OK

    * __Content:__

        `No content, you are redirected to original URL`

* __Error Response__

    * __Code:__ 400 BAD REQUEST

    * __Content:__

        ```
        400: Bad Request: ID must be a number
        ```
    
    OR

    * __Code:__ 404 NOT FOUND

    * __Content:__

        ```
        404: ID Not Found
        ```

* __Sample Call__

    ```
    curl --request GET \
      --url 'https://sankshipt.herokuapp.com/1'
    ```

# Fun Fact
`Sankshipt` in `Hindi` means `Abridged`

# Thanks
To [Irene Ros](https://github.com/iros) for the doc [template](https://gist.github.com/iros/3426278).

#### Signing-off, Abhay Kumar