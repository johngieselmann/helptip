<h1>Helptip jQuery Plugin</h1>

<p>This is a jQuery plugin that generates a "help tip" for the targeted element(s). The content for the help tip comes from the title attribute of the targeted element(s).</p>

<h2>How it Works</h2>

<p>

<h2>How to Use</h2>

<p>Include these files in your project:</p>

<ul>
    <li>jquery.helptip.min.js</li>
    <li>jquery.helptip.css</li>
</ul>

<p>Call the helptip function on a targeted element.</p>
<p><code>$('.example').helptip();</code></p>

<h2>Options</h2>

<p>
</p>
            <a name="options"></a>
            <div class="lesson">
                <div class="lesson-title">Options</div>
                <div class="lesson-content">
                    <div class="lesson-point">
                        <div class="lesson-point-title">arrowWidth (int)<span class="default">default: 7</span></div>
                        <div class="lesson-point-content">
                            <p>The pixel value of how wide to make the arrow.</p>
                        </div>
                        <div class="lesson-point-example">
                            var options = { arrowWidth: 3 };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">helperClass (string)<span class="default">default: 'helptip'</span></div>
                        <div class="lesson-point-content">
                            <p>The class applied to the helper.</p>
                        </div>
                        <div class="lesson-point-example">
                            var options = { helperClass: 'helptip' };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">helperId (string)<span class="default">default: 'helptip'</span></div>
                        <div class="lesson-point-content">
                            <p>The ID applied to the helper.</p>
                        </div>
                        <div class="lesson-point-example">
                            var options = { helperId: 'helptip' };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">helperStyles (object)<span class="default">default: { }</span></div>
                        <div class="lesson-point-content">
                            <p>Associative array of inline styles and values to be applied to the helper that override the style sheet. These styles are applied with the jQuery .css() method and should match the optional object parameter passed into it.</p>
                        </div>
                        <div class="lesson-point-example">
                            var options = { helperStyles: {'border':'1px solid #000'} };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">innerClass (string)<span class="default">default: 'helptip-inner'</span></div>
                        <div class="lesson-point-content">
                            <p>The class applied to the inner helper.</p>
                        </div>
                        <div class="lesson-point-example">
                            var options = { innerClass: 'helptip-inner' };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">innerId (string)<span class="default">default: 'helptip-inner'</span></div>
                        <div class="lesson-point-content">
                            <p>The ID applied to the inner helper.</p>
                        </div>
                        <div class="lesson-point-example">
                            var options = { innerId: 'helptip-inner' };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">innerStyles (object)<span class="default">default: { }</span></div>
                        <div class="lesson-point-content">
                            <p>Associative array of inline styles and values to be applied to the inner helper that override the style sheet. These styles are applied with the jQuery .css() method and should match the optional object parameter passed into it.</p>
                        </div>
                        <div class="lesson-point-example">
                            var options = { innerStyles: {'border':'1px solid #000'} };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">position (string)<span class="default">default: 'top-center'</span></div>
                        <div class="lesson-point-content">
                            <p>Where to position the helper in relation to the targeted element. Possible values:</p>
                            <ul>
                                <li><strong>top-left</strong></li>
                                <li><strong>top-center</strong></li>
                                <li><strong>top-right</strong></li>
                                <li><strong>right</strong></li>
                                <li><strong>left</strong></li>
                                <li><strong>bottom-left</strong></li>
                                <li><strong>bottom-center</strong></li>
                                <li><strong>bottom-right</strong></li>
                            </ul>
                        </div>
                        <div class="lesson-point-example">
                            var options = { position: 'top-center' };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">showArrow (boolean)<span class="default">default: true</span></div>
                        <div class="lesson-point-content">
                            <p>Whether or not to show the arrow.</p>
                            <ul>
                                <li><strong>true</strong>: show the arrow</li>
                                <li><strong>false</strong>: do not show the arrow</li>
                            </ul>
                        </div>
                        <div class="lesson-point-example">
                            var options = { showArrow: true };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">showHidden (boolean)<span class="default">default: false</span></div>
                        <div class="lesson-point-content">
                            <p>Whether or not to ignore elements hidden with opacity style.</p>
                            <ul>
                                <li><strong>true</strong>: show the tip on non-visible elements</li>
                                <li><strong>false</strong>: do not show the tip on non-visible elements</li>
                            </ul>
                        </div>
                        <div class="lesson-point-example">
                            var options = { showHidden: false };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">spacing (int)<span class="default">default: 3</span></div>
                        <div class="lesson-point-content">
                            <p>The number of pixels of spacing between the helper and the targeted element.</p>
                        </div>
                        <div class="lesson-point-example">
                            var options = { spacing: 3 };<br />
                            var helptip = $('.element').helptip(options);
                        </div>
                    </div>
                </div>
            </div>
            <a name="callbacks"></a>
            <div class="lesson">
                <div class="lesson-title">Callbacks</div>
                <div class="lesson-content">
                    <div class="lesson-point">
                        <div class="lesson-point-title">onHide (function)<span class="default">default: false</span></div>
                        <div class="lesson-point-content">
                            <p>Callback function executed with the helper is hidden. It is only executed if the user passes in a function to be called.</p>
                            <p>The onHide method passes in three parameters: (event,target,helper)</p>
                            <ul>
                                <li><strong>event</strong>: the triggered event passed from jQuery</li>
                                <li><strong>target</strong>: the jQuery object of the element(s) targeted for the help tip</li>
                                <li><strong>helper</strong>: the jQuery object of the helper</li>
                            </ul>
                        </div>
                        <div class="lesson-point-example">
                            var callback = function(event,target,helper){<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;console.log(event);<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;console.log(target);<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;console.log(helper);<br />
                            };<br />
                            var helptip = $('.element').helptip({ onHide: callback });
                        </div>
                    </div>
                    <div class="lesson-point">
                        <div class="lesson-point-title">onShow (function)<span class="default">default: false</span></div>
                        <div class="lesson-point-content">
                            <p>Callback function executed with the helper is shown. It is only executed if the user passes in a function to be called.</p>
                            <p>The onShow method passes in three parameters: (event,target,helper)</p>
                            <ul>
                                <li><strong>event</strong>: the triggered event passed from jQuery</li>
                                <li><strong>target</strong>: the jQuery object of the element(s) targeted for the help tip</li>
                                <li><strong>helper</strong>: the jQuery object of the helper</li>
                            </ul>
                        </div>
                        <div class="lesson-point-example">
                            var callback = function(event,target,helper){<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;console.log(event);<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;console.log(target);<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;console.log(helper);<br />
                            };<br />
                            var helptip = $('.element').helptip({ onShow: callback });
                        </div>
                    </div>
                </div>
            </div>
            <a name="methods"></a>
            <div class="lesson">
                <div class="lesson-title">Methods</div>
                <div class="lesson-content">
                    <div class="lesson-point">
                        <div class="lesson-point-title">disable()</div>
                        <div class="lesson-point-content">
                            <p>Calling this method disables the showing of the help tip.</p>
                        </div>
                        <div class="lesson-point-example">
                            var helptip = $('.element').helptip();<br />
                            helptip.disable();
                        </div>
                    </div>                
                    <div class="lesson-point">
                        <div class="lesson-point-title">enable()</div>
                        <div class="lesson-point-content">
                            <p>Calling this method enables the showing of the help tip if it had been previously disabled.</p>
                        </div>
                        <div class="lesson-point-example">
                            var helptip = $('.element').helptip();<br />
                            helptip.enable();
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    </div>
</body>
</html>
