use position_velocity_macros::{Position, Velocity};

pub trait AddF64 {
    fn add_f64(&self, other: &Self) -> Self;
}

pub trait MulF64 {
    fn mul_f64(&self, f: f64) -> Self;
}

pub trait Position {
    type T;
    fn position(&self) -> &Self::T;
}

pub trait Velocity: Position
where
    Self::T: AddF64 + MulF64,
{
    fn velocity(&self) -> &Self::T;
    fn position_at(&self, t: f64) -> Self::T {
        self.position().add_f64(&self.velocity().mul_f64(t))
    }
}

#[derive(Position)]
struct Particle<T> {
    position: T,
}

#[derive(Velocity)]
struct MovingParticle<T: MulF64 + AddF64> {
    position: T,
    velocity: T,
}

// Implement AddF64 for the tuple (f64, f64)
impl AddF64 for (f64, f64) {
    fn add_f64(&self, other: &Self) -> Self {
        (self.0 + other.0, self.1 + other.1)
    }
}

// Implement MulF64 for the tuple (f64, f64)
impl MulF64 for (f64, f64) {
    fn mul_f64(&self, f: f64) -> Self {
        (self.0 * f, self.1 * f)
    }
}

fn main() {
    let moving_particle = MovingParticle {
        position: (5.0, 6.0),
        velocity: (1.0, 1.0),
    };

    println!("Initial moving particle position: {:?}", moving_particle.position());
    println!("Initial moving particle velocity: {:?}", moving_particle.velocity());

    let updated_position = moving_particle.position_at(2.0);

    println!("Updated moving particle position: {:?}", updated_position);
}
