import styled from "styled-components";
import { ComponentType, HTMLProps } from "react";

export const Root = styled.div`
  display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
`;

export const Header = styled.header`
    display: flex;
    flex: 1 0;
    padding: 20px;
`;

export const Title = styled.h1`
    font-size: 1.5em;
    text-transform: uppercase;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

export const Form = styled.form`
    display: "flex";
    flex-direction: column;
    align-items: center;
`;

export const Row: ComponentType<HTMLProps<HTMLDivElement> & { center?: boolean}> = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: ${(props: any)=> props.center && "center"};
` as any;

export const Input = styled.input`
    margin: 1rem;
`;

export const Label = styled.label`
    margin: 1rem;
    text-transform: uppercase;
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1rem;
`;

export const Button = styled.button`
text-transform: uppercase;
    margin: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`;

export const BusyBox = styled.div`
    display: flex;
    flex-direction: row;
`;

export const BusyText = styled.div`
  text-transform: uppercase;
`;

export const ErrorBox = styled.div`
display: flex;
    flex-direction: row;
`;

export const ErrorText = styled.span`
  color: red;
`;