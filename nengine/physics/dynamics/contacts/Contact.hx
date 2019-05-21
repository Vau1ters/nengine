package nengine.physics.dynamics.contacts;
import nengine.math.*;
import nengine.components.Transform;
import nengine.physics.collision.Manifold;
import nengine.physics.collision.shapes.Shape;
import nengine.physics.dynamics.contacts.ContactEdge;
using nengine.physics.collision.ManifoldFunction;

class Contact
{
    public var manifold(default, null):Manifold;
    public var shapeA:Shape;
    public var shapeB:Shape;
    public var touching = false;
    public var prev:Contact;
    public var next:Contact;
    public var nodeA:ContactEdge;
    public var nodeB:ContactEdge;
    public var flags:Int;
    public var friction:Float;
    public var restitution:Float;
    public var tangentSpeed:Float;

    // flags
    public static inline var islandFlag = 0x0001;
    public static inline var touchingFlag = 0x0002;
    public static inline var enabledFlag = 0x0004;
    public static inline var filterFlag = 0x0008;
    public static inline var bulletHitFlag = 0x0010;
    public static inline var toiFlag = 0x0020;

    public static function create(shapeA:Shape, shapeB:Shape):Contact
    {
        var primary = true;
        var contact = switch([shapeA.type, shapeB.type])
        {
            case [Circle, Circle]:
                CircleContact.create();
            case [Polygon, Polygon]:
                PolygonContact.create();
            case [Circle, Polygon]:
                primary = false;
                PolygonAndCircleContact.create();
            case [Polygon, Circle]:
                PolygonAndCircleContact.create();
        }
        if(primary){
            contact.shapeA = shapeA;
            contact.shapeB = shapeB;
        }else{
            contact.shapeA = shapeB;
            contact.shapeB = shapeA;
        }

        return contact;
    }

    public function update(listener:ContactListener):Void
    {
        var oldManifold = manifold;
        var touching = false;
        var wasTouching = this.touching;
        var sensor = shapeA.isSensor || shapeB.isSensor;
        var transformA = shapeA.body.transform;
        var transformB = shapeB.body.transform;

        if(sensor)
        {
            touching = !Type.enumEq(Manifold.None, evaluate(transformA, transformB));
            manifold = Manifold.None;
        }
        else
        {
            manifold = evaluate(transformA, transformB);
            touching = !Type.enumEq(Manifold.None, manifold);
            manifold.mapPoints((point)-> {
                point.normalImpulse = 0;
                point.tangentImpulse = 0;

                oldManifold.mapPoints((oldPoint)-> {
                    if(point.isSame(oldPoint))
                    {
                        point.normalImpulse = oldPoint.normalImpulse;
                        point.tangentImpulse = oldPoint.tangentImpulse;
                    }
                });
            });
        }

        this.touching = touching;

        if(!wasTouching && touching && listener != null)
        {
            listener.beginContact(this);
        }

        if(wasTouching && !touching && listener != null)
        {
            listener.endContact(this);
        }

        if(!sensor && touching && listener != null)
        {
            listener.preSolve(this, oldManifold);
        }
    }

    private function evaluate(transformA:Transform2, transformB:Transform2):Manifold
    {
        throw "this function should be overridden";
    }

}
