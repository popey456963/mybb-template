const fs = require('fs')
const util = require('util')
const CleanCSS = require('clean-css')
const beautify = require('xml-beautifier')
const minify = require('html-minifier').minify

const css = {
  'global': false,
  'dropdowns': false,
  'extra': false,
  'css3': false,
  'menu': false,
  'tips': false,
  'thread_status': 'forumdisplay.php|usercp.php|search.php',
  'star_ratings': 'forumdisplay.php|showthread.php',
  'usercp': 'usercp.php|usercp2.php|private.php',
  'showthread': 'showthread.php',
  'modcp': 'modcp.php'
}

function read(file) {
  return fs.readFileSync(`data/${file}`, 'utf8')
}

function gen_templates() {
  let text = ''
  for (let file of fs.readdirSync('data/html')) {
    text += `<template name="${file.split('.')[0]}" {{version}}>${read(`html/${file}`).html().cdata('\r\n')}</template>`
  }
  return text
}

function gen_stylesheets() {
  let text = ''
  for (let stylesheet in css) {
    text += `<stylesheet name="${stylesheet}.css" ${ css[stylesheet] ? `attachedto="${css[stylesheet]}"` : ""} {{version}}>${read(`css/${stylesheet}.css`).cdata('\r\n')}</stylesheet>`
  }
  return text
}

String.prototype.cdata = function(first) {
  return `<![CDATA[${first || ''}${this}]]>`
}

String.prototype.template = function(string, text) {
  return this.replace(new RegExp(`\{\{${string}\}\}`, `g`), text)
}

String.prototype.no_white = function() {
  return this.replace(/\s/g, '')
}

String.prototype.css = function() {
  return this
  // return (new CleanCSS({ level: 0 })).minify(this.replace(/\r?\n/g, '\n')).styles
}

String.prototype.html = function() {
  return this
  try {
    return minify(this, {
      minifyCSS: true,
      minifyJS: false,
      removeComments: true
    })
  } catch(e) {
    return this
  }
  // return this
}

let xml = read('template.xml')

const data = {
  disporder: read('disporder.data').cdata().no_white(),
  templates: gen_templates(),
  stylesheets: gen_stylesheets(),
  version: `version="1809"`,
}

for (let item in data) {
  xml = xml.template(item, data[item])
}

// xml = beautify(xml)

fs.writeFileSync('data/theme.xml', xml, 'utf8')
