package ctrl

import (
	seelog "github.com/cihub/seelog"
	"github.com/flosch/pongo2"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"golang-gin/conf"
	"gopkg.in/gin-gonic/gin.v1"
	"net/http"
)

type ArticleController struct {
}

var sqlconn string = conf.Conn
var logger = conf.Logger

//数据库表 articles 映射
type Articles struct {
	Id         int
	Item       int
	Title      string
	Content    string
	Created_at string
	Updated_at string
}

func (ct *ArticleController) Get(c *gin.Context) {
	//开启日志
	seelog.ReplaceLogger(logger)
	defer seelog.Flush()

	//数据库连接
	db, err := sqlx.Connect("mysql", sqlconn)
	if err != nil {
		seelog.Error("can't connect db ", err)
		return
	}
	defer db.Close()

	p := []Articles{}
	err = db.Select(&p, "SELECT * FROM articles")
	if err != nil {
		seelog.Error("can't read db ", err)
		return
	}
	seelog.Debug(&p)
	c.HTML(http.StatusOK, "article.html", pongo2.Context{"data": &p})
}

func (ct *ArticleController) Store(c *gin.Context) {
	//开启日志
	seelog.ReplaceLogger(logger)
	defer seelog.Flush()

	//数据库连接
	db, err := sqlx.Connect("mysql", sqlconn)
	if err != nil {
		seelog.Error("can't connect db ", err)
		return
	}
	defer db.Close()
	content := c.PostForm("content")
	db.MustExec(`INSERT INTO articles (content) VALUES (?)`, content)
	c.Redirect(http.StatusMovedPermanently, "/")
}