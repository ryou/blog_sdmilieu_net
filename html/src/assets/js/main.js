;(function() {
  var AriticleListComponent = {
    props: ['articles'],
    template: '#article-list-component-template',
    components: {
      'link-component': {
        props: ['article'],
        template: '#link-component-template',
        computed: {
          url: function() {
            return '/posts/';
          },
          date: function() {
            var date = new Date(
              this.article.date.slice(0, 4),
              this.article.date.slice(4, 6)-1,
              this.article.date.slice(6, 8)
            );
            return date;
          }
        }
      },
    },
  };
  var PagerComponent = {
    props: ['current', 'total'],
    template: '#pager-component-template',
    computed: {
      prevIsExist: function() {
        return (this.current > 0);
      },
      nextIsExist: function() {
        return (this.current+2 < this.total);
      },
      prevUrl: function() {
        return '/page/' + (this.current - 1);
      },
      nextUrl: function() {
        return '/page/' + (this.current + 1);
      }
    },
    methods: {
    }
  };
  var IndexPageComponent = {
    data: function() {
      return {
        search: '',
        currentPage: 0,
        count: 10
      };
    },
    props: ['articles'],
    template: '#index-page-component-template',
    computed: {
      dispArticles: function() {
        var outArticle = this.articles;

        if (this.search.length > 0) {
          outArticle = outArticle.filter((article) => {
            return article.title.toLowerCase().includes(this.search.toLowerCase());
          });
        } else {
          outArticle = outArticle.slice(this.count*this.currentPage, this.count*(this.currentPage+1))
        }
        return outArticle;
      },
      totalPage: function() {
        return (this.articles.length / this.count) + 1;
      }
    },
    methods: {
    },
    watch: {
      '$route': function(to, from) {
        if (typeof to.params.index === 'undefined') {
          this.currentPage = 0;
        } else {
          this.currentPage = parseInt(to.params.index);
        }
        $(window).scrollTop(0);
      }
    },
    components: {
      'article-list-component': AriticleListComponent,
      'pager-component': PagerComponent
    },
    mounted: function() {
      document.title = 'index';
      if (typeof this.$route.params.index === 'undefined') {
        this.currentPage = 0;
      } else {
        this.currentPage = parseInt(this.$route.params.index);
      }
    }
  };
  var PostPageComponent = {
    data: function() {
      return {
        content: '',
        date: '',
        meta: null
      };
    },
    props: ['articles'],
    template: '#post-page-component-template',
    computed: {
      title: function() {
        return (this.$route.params.perma_link.split('__'))[1];
      },
      dateObj: function() {
        var date = new Date(
          this.date.slice(0, 4),
          this.date.slice(4, 6)-1,
          this.date.slice(6, 8)
        );
        return date;
      }
    },
    mounted: function() {
      var self = this;
      this.articles.forEach(function(e, i, a) {
        if (e.perma_link === self.$route.params.perma_link) {
          self.meta = e;
          document.title = self.meta.title;
        }
      });

      $.ajax({
        type: 'GET',
        url: './README.md',
      })
      .then(
        function(res) {
          self.content = marked(res);
        },
        function() {
          console.log('error');
        }
      );
      $.getJSON('./meta.json')
        .done(function(json) {
          self.date = json.created_at;
        });
    }
  };
  var NotFoundPageComponent = {
    template: '<div>not found.</div>',
    mounted: function() {
      document.title = 'not found';
    }
  };

  var app = new Vue({
    data: {
      articles: []
    },
    el: '#app',
    router: new VueRouter({
      mode: 'history',
      routes: [
        { path: '/', component: IndexPageComponent },
        { path: '/page/:index/', component: IndexPageComponent },
        { path: '/posts/:perma_link/', component: PostPageComponent },
        { path: '*', component: NotFoundPageComponent }
      ]
    }),
    created: function() {
      var self = this;
      $.getJSON('/posts/articles.json')
        .done(function(json) {
          if (json.meta.status !== 200) {
            alert('記事リストの取得に失敗しました。');
            return;
          }
          json.data.forEach(function(e, i, a) {
            var obj = {
              url: '/posts/' + e.perma_link + '/',
              perma_link: e.perma_link,
              date: e.created_at,
              title: e.title,
              excerpt: e.excerpt
            };
            self.articles.push(obj);
          });
        })
        .fail(function() {
          alert('記事リストの取得に失敗しました。');
          return;
        });
    }
  });
})();
