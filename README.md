# Welcome to **arthuranteater**  
### Sharing projects, coding challenges, new tech, and best practices


I'm Hunt Applegate, a software engineer from Denver, CO. I'm always looking to collaborate on awesome projects. Got an ideas for website, project, or post?  

**<a href="https://www.huntcodes.co/" target="_blank">Contact Me</a>**

Thanks for visiting!

The dlog, dev blog, was built with Gatsby, Babel, Webpack, GraphQl, React, Redux, Material UI, React JSS, Node, Express, Postgresql, Agolia, and Facebook.

#### Features

Coming soon:

* Dark mode for relaxed viewing
* Google recaptcha for bot protection
* Markdown commenting with caching

What I've added:

* Cheatsheets for quick reference guide
* Choice of categories for subscribers
* Chips for mulitple contributors
* Chips for hashtags searches #awesome
* Optimized Algolia search for longer posts
* Subscribe with email verification
* Secure storage for subscriber emails
* Secure storage for post information
* Automated error logging for emailing
* Automated email blasts for new posts

What was built-in:

* Editable Markdown files for posting
* Sitemap, robot, meta, OpenGraph for SEO
* Social icons for sharing the posts
* Facebook comments for leaving remarks
* Lazy loading items for better time
* Categories for post list filtering
* Algolia search for scanning the site
* Google Analytics for viewing traffic
* Customizable base styles for styling
* Webpack plugin for monitoring load time

#### Post

- Fork and clone  

- Content -> posts  

- Add new folder in same format  
(folder-example = 2019-03-26--jasmine-vs-jest)  

- **Use yesterday's date as the post date**  
(Updated after pull request)  

- Add markdown file(s) in same format  
(Markdowns will be combined into one post)

##### 1 - Create File

Terminal with VS Code:
```
$ git clone https://github.com/<your-username>/my-blog.git
$ cd my-blog
$ code .
```

Terminal without VS Code:
```
$ git clone https://github.com/<your-username>/my-blog.git
$ cd my-blog/content/posts
$ take year-month-date--title 
```
(folder-example = 2019-03-26--jasmine-vs-jest)  
  
- **Use yesterday's date as the post date**  
(Updated after pull request)  

```
$ touch index.md
```
- Or move markdown into folder using cp or drag and drop!

##### 2 - Write a bunch of cool stuff

- Use your favorite **<a href="https://dillinger.io/" target="_blank">markdown editor</a>**  

- Reference our **<a href="https://arthuranteater.com/cheatsheets/" target="_blank">markdown cheatsheet</a>**

##### 3 - Pull latest from master to update

```
$ git pull https://github.com/arthuranteater/my-blog.git master
$ git remote -v
$ git push origin master
```

- Your working branch should be updated without any merge conflicts.

##### 4 - Submit pull request

- Go to **<a href="https://github.com/arthuranteater/my-blog.git" target="_blank">our repo</a>**

- New pull request (top right) -> compare across forks (top right)

- Review changes and submit!

#### Contributors

The starter template was built by Greg Lobinski. See also the list of **<a href="https://github.com/greglobinski/gatsby-starter-personal-blog/graphs/contributors" target="_blank">contributors</a>** who participated in this project.


#### Recreate

If you do not have Gatsby Cli installed yet...

```text
npm install --global gatsby-cli
```

More information on **<a href="https://www.gatsbyjs.org/tutorial/part-one" target="_blank">Gatsby</a>**

Clone the repo.
```text
git clone https://github.com/arthuranteater/my-blog.git
```
Run on http://localhost:8000.
```text
gatsby develop
```
Build to create static site.
```text
gatsby build
```

#### Services

All services are free to use or have generous free tiers big enough for a personal blog.

Create an `.env` file like below in the root folder. Change `...` placeholders with real data.

```text
GOOGLE_ANALYTICS_ID=...
ALGOLIA_APP_ID=...
ALGOLIA_SEARCH_ONLY_API_KEY=...
ALGOLIA_ADMIN_API_KEY=...
ALGOLIA_INDEX_NAME=...
FB_APP_ID=...
```

#### Emails

To offer a subscription service, you can use Netlify or build a server for emailing. I chose to build a server with Node. Click **<a href="https://github.com/arthuranteater/my-blog-server" target="_blank">here</a>** to view the Github repo.

If you would like to use the Node server, please add security keys for the following in your .env file.

```
ADDSUB=''
VALUES=''
ADDPOST=''
DELSUB=''
WELCOME=''
SERVER=''
SECRET=''
```

#### License

<p style="font-size: 8px">MIT License Copyright (c) 2017 gatsbyjs\
Copyright (c) 2018 greg lobinski</p><p style="font-size: 8px">Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>

