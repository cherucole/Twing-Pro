from flask import render_template, request, redirect,url_for, abort, flash
from . import main
from .forms import UpdateProfile, SearchForm
from ..models import  User, Listener
from flask_login import login_required, current_user
from .. import db, photos
import markdown2
import tweepy
from textblob import TextBlob
import json
import sys
import re
import csv
import os
import time
from datetime import datetime
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from flask import Flask, render_template, url_for, jsonify, redirect
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField

import plotly.plotly as py
import plotly.graph_objs as go
import plotly.figure_factory as FF

import numpy as np
import pandas as pd

# INDEX PAGE
@main.route('/', methods=['GET', 'POST'])
def index():
    form = SearchForm()
    print(form.validate_on_submit())
    data_list = []
    if form.validate_on_submit():
        os.remove('search.csv')
        os.remove('datam.csv')
        search = form.search.data
        Listener.runTweets(search)
    # print('\n\n\n\n\n\n\n  done ')
    reader = csv.reader(open('datam.csv', 'r'))
    for row in reader:
        data_list.append(row)
        jsonify({'twing': data_list})

    return render_template('index.html', form=form)

@main.route('/about')
def about():
    """ View root page function that returns the about page """

    return render_template('about.html')

# VIEWING EACH SPECIFIC PROFILE
@main.route('/user/<uname>')
@login_required
def profile(uname):
    user = User.query.filter_by(username = uname).first()

    if user is None:
        abort(404)

    return render_template("profile/profile.html", user = user)

# UPDATING PROFILE
@main.route('/user/<uname>/update',methods = ['GET','POST'])
@login_required
def update_profile(uname):
    user = User.query.filter_by(username=uname).first()
    if user is None:
        abort(404)

    form = UpdateProfile()

    if form.validate_on_submit():
        user.bio = form.bio.data

        db.session.add(user)
        db.session.commit()

        return redirect(url_for('.profile',uname=user.username))

    return render_template('profile/update.html',form =form)

# UPDATING PICTURE
@main.route('/user/<uname>/update/pic',methods= ['POST'])
@login_required
def update_pic(uname):
    user = User.query.filter_by(username = uname).first()
    if 'photo' in request.files:
        filename = photos.save(request.files['photo'])
        path = f'photos/{filename}'
        user.profile_pic_path = path
        db.session.commit()
    return redirect(url_for('main.profile',uname=uname))


# @main.route('/dashboard')
# @login_required
# def dashboard():
#     """
#     Render the dashboard template on the /dashboard route
#     """
#     return render_template('dashboard.html', title="Dashboard")


@main.route('/data')
@login_required
def data():
    reader = csv.reader(open('datam.csv', 'r'))
    data_list = []
    for row in reader:
        data_list.append(row)
    return jsonify({'twing': data_list})


@main.route('/analytics', methods=['GET', 'POST'])
@login_required
def analytics():
    form = SearchForm()
    print(form.validate_on_submit())
    data_list = []
    if form.validate_on_submit():
        os.remove('search.csv')
        os.remove('datam.csv')
        search = form.search.data
        Listener.runTweets(search)

    reader = csv.reader(open('datam.csv', 'r'))
    for row in reader:
        data_list.append(row)
        jsonify({'twing': data_list})

        title= 'Analytics'
        return render_template('graph.html', form=form, title=title)
    return render_template('graph.html', form=form)
