/*global THREE:true BinaryReader:true */

(function () {
    var __hasProp = {}.hasOwnProperty,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    THREE.STLLoader = (function (_super) {

        __extends(STLLoader, _super);

        function STLLoader() {
            var _this = this;
            this.parseBinary = function (data) {
                return STLLoader.prototype.parseBinary.apply(_this, arguments);
            };
            this.parse = function (data) {
                return STLLoader.prototype.parse.apply(_this, arguments);
            };
            STLLoader.__super__.constructor.call(this);
        }

        STLLoader.prototype.load = function (url) {
            var _this = this;
            console.log("Attempting to load URL: [" + url + "]");
            return $.ajax({
                method: 'GET',
                url: url,
                crossDomain: true,
                beforeSend: function (xhr) {
                    return xhr.overrideMimeType('text/plain; charset=x-user-defined');
                },
                success: function (data, text, xhr) {
                    var buffer, i, _i, _ref;
                    buffer = new Uint8Array(data.length);
                    for (i = _i = 0, _ref = data.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                        buffer[i] = data.charCodeAt(i);
                    }
                    buffer = buffer.buffer;
                    return _this.dispatchEvent({
                        type: 'load',
                        content: _this.parse(data)
                    });
                },
                error: function (xhr, status, error) {
                    return _this.dispatchEvent({
                        type: 'error',
                        message: "Could not load URL [" + url + "] [" + error + "]"
                    });
                }
            });
        };

        STLLoader.prototype.parse = function (data) {
            var isBinary,
                _this = this;
            isBinary = function (data) {
                var expect, face_size, n_faces, reader;
                reader = new BinaryReader(data);
                reader.seek(80);
                face_size = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8);
                n_faces = reader.readUInt32();
                expect = 80 + (32 / 8) + (n_faces * face_size);
                return expect === reader.getSize();
            };
            if (isBinary(data)) {
                return this.parseBinary(data);
            } else {
                return this.parseASCII(data);
            }
        };

        STLLoader.prototype.parseBinary = function (data) {
            var face, geometry, n_faces, readFloat3, reader, _fn, _i,
                _this = this;
            reader = new BinaryReader(data);
            readFloat3 = function () {
                return [reader.readFloat(), reader.readFloat(), reader.readFloat()];
            };
            reader.seek(80);
            n_faces = reader.readUInt32();
            geometry = new THREE.Geometry();
            _fn = function (face) {
                var attr, length, newNormal, normal, v1, v2, _j;
                normal = (function (func, args, ctor) {
                    ctor.prototype = func.prototype;
                    var child = new ctor(),
                        result = func.apply(child, args);
                    return Object(result) === result ? result : child;
                })(THREE.Vector3, readFloat3(), function () {});
                for (_j = 1; _j <= 3; _j++) {
                    geometry.vertices.push((function (func, args, ctor) {
                        ctor.prototype = func.prototype;
                        var child = new ctor(),
                            result = func.apply(child, args);
                        return Object(result) === result ? result : child;
                    })(THREE.Vector3, readFloat3(), function() {}));
                }
                attr = reader.readUInt16();
                length = geometry.vertices.length;
                v1 = new THREE.Vector3().subVectors(geometry.vertices[length - 3], geometry.vertices[length - 2]);
                v2 = new THREE.Vector3().subVectors(geometry.vertices[length - 3], geometry.vertices[length - 1]);
                newNormal = new THREE.Vector3().crossVectors(v1, v2).normalize();
                return geometry.faces.push(new THREE.Face3(length - 3, length - 2, length - 1, newNormal));
            };
            for (face = _i = 0; 0 <= n_faces ? _i < n_faces : _i > n_faces; face = 0 <= n_faces ? ++_i : --_i) {
                _fn(face);
            }
            geometry.computeCentroids();
            geometry.computeBoundingBox();
            geometry.computeBoundingSphere();
            return geometry;
        };

        STLLoader.prototype.parseASCII = function (data) {
            var geometry, length, newNormal, normal, patternFace, patternNormal, patternVertex, result, text, v1, v2;
            geometry = new THREE.Geometry();
            patternFace = /facet([\s\S]*?)endfacet/g;
            while (((result = patternFace.exec(data)) != null)) {
                text = result[0];
                patternNormal = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
                while (((result = patternNormal.exec(text)) != null)) {
                    normal = new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5]));
                }
                patternVertex = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
                while (((result = patternVertex.exec(text)) != null)) {
                    geometry.vertices.push(new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5])));
                }
                length = geometry.vertices.length;
                v1 = new THREE.Vector3().subVectors(geometry.vertices[length - 3], geometry.vertices[length - 2]);
                v2 = new THREE.Vector3().subVectors(geometry.vertices[length - 3], geometry.vertices[length - 1]);
                newNormal = new THREE.Vector3().crossVectors(v1, v2).normalize();
                geometry.faces.push(new THREE.Face3(length - 3, length - 2, length - 1, newNormal));
            }
            geometry.computeCentroids();
            geometry.computeBoundingBox();
            geometry.computeBoundingSphere();
            return geometry;
        };

        return STLLoader;

    })(THREE.EventDispatcher);

}).call(this);
