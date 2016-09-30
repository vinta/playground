var casper = require('casper').create({
  pageSettings: {
    loadImages: false,
    loadPlugins: false
  },
  logLevel: 'debug',
  verbose: true
});

// save session cookies
var fs = require('fs');
var page = require('webpage').create();

var cookieFile = 'cookies.json';

var saveSessionCookie = function() {
  fs.write(cookieFile, JSON.stringify(phantom.cookies), 'w');
}

if (fs.isFile(cookieFile)) {
  Array.prototype.forEach.call(JSON.parse(fs.read(cookieFile)), function(x) {
    phantom.addCookie(x);
  });
}

// script
var loginUrl = 'https://accounts.douban.com/login';
var startUrl = 'https://movie.douban.com/people/vinta/all';

var tags_do_not_delete = [
  '丹麦', '新西兰', '新加坡', '以色列', '印度', '意大利', '瑞典', '墨西哥', '俄罗斯', '西班牙', '比利时'
];

casper.start(loginUrl, function() {
  this.echo(this.getCurrentUrl());
  this.echo(this.getTitle());

  this.capture('login.png');

  this.waitForSelector('form#lzform');
  this.fill('form#lzform', {
       form_email: 'xxx',
       form_password: 'xxx'
  }, true);
});

casper.then(function() {
  // 登入之後會來到首頁
  this.echo(this.getCurrentUrl());
  this.echo(this.getTitle());

  saveSessionCookie();

  this.capture('all.png');

  this.open(startUrl).then(function() {
    this.waitForSelector('#open_tags', function() {
      this.click('#open_tags');
    });

    this.waitWhileSelector('#open_tags');
  });
});

casper.then(function() {
  this.echo(this.getCurrentUrl());
  this.echo(this.getTitle());

  var links = this.evaluate(function() {
    var tagList = document.querySelectorAll('ul.tag-list li a');
    var theLinks = Array.prototype.map.call(tagList, function(elem) {
        return {
          tag: elem.textContent.trim(),
          href: elem.getAttribute('href'),
          count: parseInt(elem.nextElementSibling.textContent, 10)
        };
    });

    return theLinks;
  });

  var filteredLinks = links.filter(function(link) {
    if (link.count < 5 && tags_do_not_delete.indexOf(link.tag) == -1) {
      return true;
    }
    return false;
  });

  this.each(filteredLinks, function(self, link) {
    this.echo(link.tag + ', ' + link.count);

    self.thenOpen(link.href, function() {
      this.echo(this.getCurrentUrl());
      this.echo(this.getTitle());

      this.waitForSelector('#tag-del', function() {
        this.click('#tag-del');
      });

      this.waitForSelector('input[name="del_submit"]', function() {
        this.click('input[name="del_submit"]');
      });
    });
  });
});

casper.run();
