import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from "@testing-library/react";
import { Card } from '../$username/Card';
import styles from "./Card.module.css";

describe('<Card>', () => {

    afterEach(cleanup);
    
    it('should render diamonds', () => {
    render(<Card card="2♦" >children</Card>);
        const card = screen.getByTestId('card');

        expect(card).toHaveClass(styles.diamonds);
    });

    it('should render hearts', () => {
    render(<Card card="Q♥" >children</Card>);
        const card = screen.getByTestId('card');

        expect(card).toHaveClass(styles.hearts);
    });


    it('should render tens', () => {
    render(<Card card="十♦" >children</Card>);
        const card = screen.getByTestId('card');

        expect(card).toHaveClass(styles.ten);
    });


    it('should render jokers', () => {
    render(<Card card="JOKER" >children</Card>);
        const card = screen.getByTestId('card');

        expect(card).toHaveClass(styles.joker);
    });
});
